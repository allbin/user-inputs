import * as React from 'react';
import { FormInputConfigArray, AnyInputConfig } from '.';
export interface GeneratedForm {
    component: typeof React.Component;
    reset: () => void;
    getValues: () => LooseObject;
    setInputConfig: (updated_config: Partial<AnyInputConfig>) => void;
}
export default function getInputForm(input_configs: FormInputConfigArray, cb?: (values: any) => void): GeneratedForm;
export declare function validateFormGeneratorInputs(input_configs: FormInputConfigArray, confirmCB?: (value: any) => void): void;
