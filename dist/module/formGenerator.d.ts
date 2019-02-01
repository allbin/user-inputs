import * as React from 'react';
import { LooseObject } from '.';
import { FormInputConfigArray, AnyInputConfigWithValue } from '.';
export interface GeneratedForm {
    component: typeof React.Component;
    reset: () => void;
    resetConfirmClick: () => void;
    getValues: () => LooseObject;
    setInputConfig: (updated_config: AnyInputConfigWithValue) => void;
}
export default function getInputForm(input_configs: FormInputConfigArray, cb?: (values: any) => void): GeneratedForm;
export declare function validateFormGeneratorInputs(input_configs: FormInputConfigArray, confirmCB?: (value: any) => void): void;
