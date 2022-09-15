/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
/**
 * Internal dependencies
 */
import DetailsControl from './components/details-control';
import { isVideoChaptersEnabled } from '.';

const withVideoChaptersEdit = createHigherOrderComponent( BlockEdit => props => {
	if ( ! isVideoChaptersEnabled ) {
		return <BlockEdit { ...props } />;
	}

	if ( ! props.name === 'core/video' || ! props.attributes?.guid ) {
		return <BlockEdit { ...props } />;
	}

	return (
		<>
			<InspectorControls>
				<DetailsControl id={ props?.attributes?.id } />
			</InspectorControls>

			<BlockEdit { ...props } />
		</>
	);
} );

export default withVideoChaptersEdit;