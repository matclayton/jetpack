import { isBlobURL } from '@wordpress/blob';
import { Component } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import photon from 'photon';
import { PHOTON_MAX_RESIZE } from '../constants';
import Image from '../image';
import Mosaic from './mosaic';
import Square from './square';

export default class Layout extends Component {
	photonize( { height, width, url } ) {
		if ( ! url ) {
			return;
		}

		// Do not Photonize images that are still uploading or from localhost
		if ( isBlobURL( url ) || /^https?:\/\/localhost/.test( url ) ) {
			return url;
		}

		// Drop query args, photon URLs can't handle them
		// This should be the "raw" url, we'll add dimensions later
		const cleanUrl = url.split( '?', 1 )[ 0 ];

		const photonImplementation = isWpcomFilesUrl( url ) ? photonWpcomImage : photon;

		const { layoutStyle } = this.props;

		if ( isSquareishLayout( layoutStyle ) && width && height ) {
			const size = Math.min( PHOTON_MAX_RESIZE, width, height );
			return photonImplementation( cleanUrl, { resize: `${ size },${ size }` } );
		}
		return photonImplementation( cleanUrl );
	}

	// This is tricky:
	// - We need to "photonize" to resize the images at appropriate dimensions
	// - The resize will depend on the image size and the layout in some cases
	// - Handlers need to be created by index so that the image changes can be applied correctly.
	//   This is because the images are stored in an array in the block attributes.
	renderImage( img, i ) {
		const { images, linkTo, selectedImage } = this.props;

		const ariaLabel = sprintf(
			/* translators: %1$d is the order number of the image, %2$d is the total number of images. */
			__( 'image %1$d of %2$d in gallery', 'jetpack' ),
			i + 1,
			images.length
		);
		return (
			<Image
				alt={ img.alt }
				aria-label={ ariaLabel }
				height={ img.height }
				id={ img.id }
				origUrl={ img.url }
				isSelected={ selectedImage === i }
				key={ i }
				link={ img.link }
				linkTo={ linkTo }
				url={ this.photonize( img ) }
				width={ img.width }
			/>
		);
	}

	render() {
		const { align, children, className, columns, images, layoutStyle } = this.props;

		const LayoutRenderer = isSquareishLayout( layoutStyle ) ? Square : Mosaic;

		const renderedImages = this.props.images.map( this.renderImage, this );

		return (
			<div className={ className }>
				<LayoutRenderer
					align={ align }
					columns={ columns }
					images={ images }
					layoutStyle={ layoutStyle }
					renderedImages={ renderedImages }
				/>
				{ children }
			</div>
		);
	}
}

function isSquareishLayout( layout ) {
	return [ 'circle', 'square' ].includes( layout );
}

function isWpcomFilesUrl( url ) {
	const { host } = new URL( url, window.location.href );
	return /\.files\.wordpress\.com$/.test( host );
}

/**
 * Apply photon arguments to *.files.wordpress.com images
 *
 * This function largely duplicates the functionality of the photon.js lib.
 * This is necessary because we want to serve images from *.files.wordpress.com so that private
 * WordPress.com sites can use this block which depends on a Photon-like image service.
 *
 * If we pass all images through Photon servers, some images are unreachable. *.files.wordpress.com
 * is already photon-like so we can pass it the same parameters for image resizing.
 *
 * @param  {string} url - Image url
 * @param  {Object} opts - Options to pass to photon
 * @returns {string}      Url string with options applied
 */
function photonWpcomImage( url, opts = {} ) {
	// Adhere to the same options API as the photon.js lib
	const photonLibMappings = {
		width: 'w',
		height: 'h',
		letterboxing: 'lb',
		removeLetterboxing: 'ulb',
	};

	// Discard some param parts
	const urlObj = Object.assign( new URL( url, window.location.href ), {
		username: '',
		password: '',
		port: '',
		search: '',
		hash: '',
	} );

	// Build query
	for ( const [ k, v ] of Object.entries( opts ) ) {
		urlObj.searchParams.set(
			photonLibMappings.hasOwnProperty( k ) ? photonLibMappings[ k ] : k,
			v
		);
	}

	return urlObj.toString();
}
