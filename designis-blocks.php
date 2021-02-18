<?php
/**
 * Plugin Name:       Designis Blocks
 * Plugin URI:        https://designis.com/
 * Description:       Handle the basics with this plugin.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Igor Sumonja
 * Author URI:        https://designis.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       designis
 * Domain Path:       /languages
 */


function designis_custom_blocks_register() {

	$asset_file_editor = include( plugin_dir_path( __FILE__ ) . 'build/editor.asset.php');

	wp_register_script(
		'designis-blocks-editor',
		plugins_url( 'build/editor.js', __FILE__ ),
		$asset_file_editor['dependencies'],
		$asset_file_editor['version']
	);

	wp_register_style(
		'designis-blocks-editor',
		plugins_url( 'build/editor.css', __FILE__ ),
		null,
		$asset_file_editor['version']
	);

	$asset_file_front = include( plugin_dir_path( __FILE__ ) . 'build/front.asset.php');

	wp_register_script(
		'designis-blocks-front',
		plugins_url( 'build/front.js', __FILE__ ),
		$asset_file_front['dependencies'],
		$asset_file_front['version']
	);

	wp_register_style(
		'designis-blocks-front',
		plugins_url( 'build/front.css', __FILE__ ),
		null,
		$asset_file_front['version']
	);

	$blocks = [
		'designis/testimonial',
	];

	$dynamic_blocks = [
//		'designis/slider' => 'designis_slider_render_callback'
	];

	foreach ($blocks as $block) {
		register_block_type( $block, array(
			'editor_script' => 'designis-blocks-editor',
			'editor_style'  => 'designis-blocks-editor',
			'script'        => 'designis-blocks-front',
			'style'         => 'designis-blocks-front',
		) );
	}

	foreach ($dynamic_blocks as $block => $key) {
		register_block_type( $block, array(
			'editor_script' => 'designis-blocks-editor',
			'editor_style'  => 'designis-blocks-editor',
			'script'        => 'designis-blocks-front',
			'style'         => 'designis-blocks-front',
			'render_callback' => $key
		) );
	}

	function designis_slider_render_callback($block_attributes, $content) {
		return 'Ja sam PHP slider';
	}

}

add_action( 'init', 'designis_custom_blocks_register' );
