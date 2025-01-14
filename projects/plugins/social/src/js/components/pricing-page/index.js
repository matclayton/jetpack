import {
	Button,
	PricingTable,
	PricingTableColumn,
	PricingTableHeader,
	PricingTableItem,
	ProductPrice,
	getRedirectUrl,
	useBreakpointMatch,
	Text,
} from '@automattic/jetpack-components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useCallback } from 'react';
import { STORE_ID } from '../../store';
import styles from './styles.module.scss';

const PricingPage = () => {
	const siteSuffix = useSelect( select => select( STORE_ID ).getSiteSuffix() );
	const updateOptions = useDispatch( STORE_ID ).updateJetpackSettings;

	const [ isLarge ] = useBreakpointMatch( 'lg' );

	const hidePricingPage = useCallback( () => {
		const newOption = {
			show_pricing_page: false,
		};
		updateOptions( newOption );
	}, [ updateOptions ] );

	return (
		<PricingTable
			title={ __( 'Write once, post everywhere', 'jetpack-social' ) }
			items={ [
				{ name: __( 'Number of shares', 'jetpack-social' ) },
				{ name: __( 'Priority support', 'jetpack-social' ) },
				{ name: __( 'Schedule posting', 'jetpack-social' ) },
				{ name: __( 'Twitter, Facebook, LinkedIn & Tumblr', 'jetpack-social' ) },
				{ name: __( 'Customize publications', 'jetpack-social' ) },
			] }
		>
			<PricingTableColumn primary>
				<PricingTableHeader>
					<ProductPrice
						price={ 10 }
						offPrice={ 1 }
						promoLabel={ __( '90% off*', 'jetpack-social' ) }
						legend={ __( '/month, billed yearly', 'jetpack-social' ) }
						currency="USD"
						hidePriceFraction={ true }
					/>
					<Button
						href={ getRedirectUrl( 'jetpack-social-basic-plan-plugin-admin-page', {
							site: siteSuffix,
							query: 'redirect_to=' + window.location.href,
						} ) }
						fullWidth
					>
						{ __( 'Get Social', 'jetpack-social' ) }
					</Button>
					<Text variant="body-extra-small" className={ styles.notice }>
						(*) { __( 'Limited offer for the first month', 'jetpack-social' ) }
					</Text>
				</PricingTableHeader>
				<PricingTableItem
					isIncluded={ true }
					label={
						<>
							<del>{ __( 'Up to 1000', 'jetpack-social' ) }</del>&nbsp;
							<strong>{ __( 'Unlimited', 'jetpack-social' ) }</strong>
						</>
					}
					tooltipTitle={ __( 'Unlimited shares', 'jetpack-social' ) }
					tooltipInfo={ __(
						'We are working on exciting new features for Jetpack Social. In the meantime, enjoy unlimited shares for a limited time!',
						'jetpack-social'
					) }
				/>
				<PricingTableItem isIncluded={ true } />
				<PricingTableItem isIncluded={ true } />
				<PricingTableItem isIncluded={ true } />
				<PricingTableItem isIncluded={ true } />
			</PricingTableColumn>
			<PricingTableColumn>
				<PricingTableHeader>
					<ProductPrice price={ 0 } legend="" currency="USD" hidePriceFraction />
					<Button
						fullWidth
						variant="secondary"
						onClick={ hidePricingPage }
						className={ isLarge && styles.button }
					>
						{ __( 'Start for free', 'jetpack-social' ) }
					</Button>
				</PricingTableHeader>
				<PricingTableItem
					isIncluded={ true }
					label={ <strong>{ __( 'Up to 30', 'jetpack-social' ) }</strong> }
				/>
				<PricingTableItem isIncluded={ false } />
				<PricingTableItem isIncluded={ true } />
				<PricingTableItem isIncluded={ true } />
				<PricingTableItem isIncluded={ true } />
			</PricingTableColumn>
		</PricingTable>
	);
};

export default PricingPage;
