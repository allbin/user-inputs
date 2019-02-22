export interface ThemeInterface {
    sizes: {
        padding: {
            horizontal: number;
        };
        fonts: {
            big: number;
            medium: number;
            small: number;
            tiny: number;
        };
        panel: {
            height: number;
        }
    };
    components: {
        left_panel: {
            shadow: string;
            width: number;
        };
        right_panel: {
          shadow: string;
          width: number;
        };
        device_list: {
            sort_container: {
                height: number;
            };
        };
        button: {
          radius: number;
          shadow: string;
          hover_shadow: string;
          height: number;
      };
      form: {
          user_input: {
              margin_bottom: number;
          };
      };
      modal: {
          border_radius: number;
      }
    };
    colors: {
        brand: string[];
        disabled_input: string;
        text: string;
        subtitle: string;
        border: string;
        background: string;
        error: string;
        gray: string[];
        dark: string[];
        red: string[];
        yellow: string[];
        green: string[];
        teal: string[];
    };
    mixins: {
      truncate: string
    };
}

let main_theme: ThemeInterface = {
    sizes: {
        padding: {
            horizontal: 16
        },
        fonts: {
            big: 24,
            medium: 18,
            small: 14,
            tiny: 12
        },
        panel: {
            height: 60
        }
    },
    components: {
        left_panel: {
            shadow: '3px 0 10px 0 rgba(0,0,0,0.22)',
            width: 300
        },
        right_panel: {
            shadow: '-3px 0 10px 0 rgba(0,0,0,0.22)',
            width: 400
        },
        device_list: {
            sort_container: {
                height: 28
            }
        },
        button: {
            radius: 3,
            shadow: '0px 3px 8px 0 rgba(0,0,0,0.42)',
            hover_shadow: '0px 11px 8px -4px rgba(0,0,0,0.42)',
            height: 38
        },
        form: {
            user_input: {
                margin_bottom: 16
            }
        },
        modal: {
            border_radius: 12
        }
    },
    colors: {
        brand: [
            '#0D1AFF',
            '#3759FF',
            '#607FFF',
            '#889FFF'
        ],
        disabled_input: '#AAA',
        text: '#212121',
        subtitle: '#7B7B7B',
        border: '#c6c2c2',
        background: '#E7ECF0',
        error: '#FC4068',
        gray: [
            '#82849A',
            '#D7DAE9',
            '#EAEDF6',
        ],
        dark: [
            '#2B344D',
            '#364161',
            '#3D496C',
            '#5C6778'
        ],
        red: [
            '#6a0016',
            '#A50023',
            '#FC4068',
            '#FD5D7E',
            '#FFB0C0'
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
    },
    mixins: {
      truncate: 'display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 95%;'
    }
};

export default main_theme;
