export interface ThemeInterface {
    sizes: {
        general: {
            transition_time: number,
            input_radius: number,
            input_padding: string
        }
    };
    colors: {
        brand: string[],
        disabled_input: string;
        text: string
        border: string,
        background: string;
        gray: string[],
        dark: string[],
        red: string[],
        yellow: string[],
        green: string[],
        teal: string[]
    };
}

let main_theme: ThemeInterface = {
    sizes: {
        general: {
            transition_time: 0.2,
            input_radius: 4,
            input_padding: '8px 12px'
        },
    },
    colors: {
        brand: [
            '#0A2E6E',
            '#1563EE',
            '#5D92F1'
        ],
        disabled_input: '#AAA',
        text: '#252424',
        border: '#CED9EE',
        background: '#E6E9F2',
        gray: [
            '#5C6778',
            '#B1C3DC',
            '#C0CFE3',
            '#E0E7F0'
        ],
        dark: [
            '#2B344D',
            '#364161',
            '#3D496C',
            '#5C6778'
        ],
        red: [
            '#bf392c',
            '#EB4D44',
            '#F47048',
            '#ff866b'
        ],
        yellow: [
            'rgb(179, 141, 28)',
            'rgb(231, 219, 60)',
            'rgb(255, 253, 6)'
        ],
        green: [
            '#32ab49',
            '#3fb742',
            '#57d547'
        ],
        teal: [
            '#32ab49',
            '#3fb742',
            '#57d547'
        ]
    }
};

export default main_theme;