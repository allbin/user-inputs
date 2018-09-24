import * as React from 'react';
export declare function InputHOC(WrappedComponent: typeof React.Component): typeof React.Component;
export declare namespace InputHOC {
    function setCustomComponents(object_with_components: ComponentObject): void;
    function generateInputs(input_configs: InputConfig[], confirmCB?: (any: any) => void): any;
}
export default InputHOC;
//# sourceMappingURL=index.d.ts.map