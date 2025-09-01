import type { Block } from 'payload'

export const GoogleMaps: Block = {
  slug: 'googleMaps',
  interfaceName: 'GoogleMapsBlock',
  labels: {
    singular: 'Google Maps Block',
    plural: 'Google Maps Blocks',
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      admin: {
        description: 'Unique ID for anchor links (e.g., "location-map" for #location-map)',
        placeholder: 'section-id',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional title for the map section',
      },
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      admin: {
        description: 'Full address to display on the map',
        placeholder: '123 Main St, City, State ZIP',
      },
    },
    {
      name: 'latitude',
      type: 'number',
      admin: {
        description: 'Optional: Latitude coordinate (e.g., 40.7128) - not needed for embedded maps',
        step: 0.000001,
      },
    },
    {
      name: 'longitude',
      type: 'number',
      admin: {
        description:
          'Optional: Longitude coordinate (e.g., -74.0060) - not needed for embedded maps',
        step: 0.000001,
      },
    },
    {
      name: 'zoom',
      type: 'number',
      defaultValue: 15,
      admin: {
        description: 'Zoom level (1-20, higher = closer)',
      },
    },
    {
      name: 'height',
      type: 'select',
      defaultValue: 'medium',
      options: [
        {
          label: 'Small (300px)',
          value: 'small',
        },
        {
          label: 'Medium (400px)',
          value: 'medium',
        },
        {
          label: 'Large (500px)',
          value: 'large',
        },
        {
          label: 'Extra Large (600px)',
          value: 'xlarge',
        },
      ],
    },
  ],
}
