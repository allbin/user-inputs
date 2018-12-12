import * as React from 'react';
import { ComponentObject, InputConfig } from './index';
export interface GeneratedForm {
    component: typeof React.Component;
    reset: () => void;
    getForms: () => void;
    getValues: () => any[];
    setInputConfig: (updated_config: InputConfig) => void;
}
export declare function getInputForm(default_components: ComponentObject, custom_components: ComponentObject, input_configs: InputConfig[], cb: (any: any) => void): GeneratedForm;
//# sourceMappingURL=formGenerator.d.ts.map