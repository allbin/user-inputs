import * as React from 'react';
import { FormInputConfigArray, AnyInputConfig } from '.';
export interface GeneratedForm {
    component: typeof React.Component;
    reset: () => void;
    getForms: () => void;
    getValues: () => any[];
    setInputConfig: (updated_config: Partial<AnyInputConfig>) => void;
}
export declare function getInputForm(default_components: ComponentObject, custom_components: ComponentObject, input_configs: FormInputConfigArray, cb?: (values: any) => void): GeneratedForm;
