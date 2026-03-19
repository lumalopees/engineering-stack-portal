<?php
/**
 * Plugin Name: Engineering Stack Portal SEO Fields
 * Description: Registers SEO custom fields for posts in REST API responses.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', function () {
    $fields = [
        'seo_title' => 'sanitize_text_field',
        'seo_description' => 'sanitize_textarea_field',
        'canonical_url' => 'esc_url_raw',
        'og_image' => 'esc_url_raw'
    ];

    foreach ($fields as $field => $sanitizer) {
        register_post_meta('post', $field, [
            'single' => true,
            'type' => 'string',
            'show_in_rest' => true,
            'sanitize_callback' => $sanitizer,
            'auth_callback' => '__return_true'
        ]);
    }
});
