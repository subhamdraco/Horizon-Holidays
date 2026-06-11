<?php
/**
 * Horizon Holidays – headless tour CPT + REST meta
 *
 * Use as: child theme functions.php OR custom plugin main file.
 * After saving, flush permalinks: Settings → Permalinks → Save.
 */

defined('ABSPATH') || exit;

add_action('init', function () {
    register_post_type('tour', [
        'labels' => [
            'name'          => 'Tours',
            'singular_name' => 'Tour',
            'add_new_item'  => 'Add New Tour',
            'edit_item'     => 'Edit Tour',
        ],
        'public'              => true,
        'has_archive'         => true,
        'show_in_rest'        => true,
        'rest_base'           => 'tour',
        'menu_icon'           => 'dashicons-palmtree',
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt'],
        'rewrite'             => ['slug' => 'tour'],
    ]);
});

/**
 * Register scalar / string meta visible in REST for published tours.
 * Itinerary & gallery stored as JSON strings for simple parsing in React.
 */
add_action('init', function () {
    $string = [
        'type'              => 'string',
        'single'            => true,
        'show_in_rest'      => true,
        'auth_callback'     => '__return_true',
    ];
    $integer = [
        'type'              => 'integer',
        'single'            => true,
        'show_in_rest'      => true,
        'auth_callback'     => '__return_true',
    ];

    register_post_meta('tour', 'tour_tagline', $string);
    register_post_meta('tour', 'tour_destination', $string);
    register_post_meta('tour', 'tour_hero_image', $string);
    register_post_meta('tour', 'tour_gallery_json', $string); // JSON array of image URLs
    register_post_meta('tour', 'tour_highlights', $string);    // newline-separated
    register_post_meta('tour', 'tour_included', $string);     // newline-separated
    register_post_meta('tour', 'tour_itinerary_json', $string); // JSON [{day,title,description},…]

    register_post_meta('tour', 'tour_price_from', [
        'type'              => 'number',
        'single'            => true,
        'show_in_rest'      => true,
        'auth_callback'     => '__return_true',
    ]);
    register_post_meta('tour', 'tour_duration_days', $integer);
    register_post_meta('tour', 'tour_nights', $integer);
    register_post_meta('tour', 'tour_currency', $string); // e.g. INR
});

/**
 * Optional: append Yoast / Rank Math head JSON if plugin exposes it (depends on version).
 * Uncomment and adapt if your SEO plugin adds this to REST.
 */
// add_action('rest_api_init', function () {
//     register_rest_field('tour', 'seo', [
//         'get_callback' => function ($obj) {
//             return get_post_meta($obj['id'], '_yoast_wpseo_title', true);
//         },
//         'schema' => ['type' => 'string'],
//     ]);
// });
