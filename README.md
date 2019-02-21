# userInput
A repo for wrapping components with a userInput HOC to enable easy creation of modals and forms.

**TODO:**
- Update this readme.
- Make a generic <UserInputs /> component, which renders popups. Eliminating need to wrap other components.
- Remove requirement to have onValueChange callbacks when no submit button is supplied for generateForm.  
*Usecase: When using form.getValues to access the values programattically.*
- Allow multiple popups on top of each other.
- Allow updating of entire form after creation.  
*Usecase: Would enable removing/adding inputs when updating the form.*


## Index
[Quick guide](#quick-guide)  
[HOC Wrapping function](#wrapping-function)  
[Utility functions](#utility-functions)  



# Quick guide
Add `"with-profile": "git+https://bitbucket.org/allbin/user-input.git#v`**`x.y.z`** to package.json. Where **x.y.z** is the version tagged.

Use `import userInputs from 'user-inputs'` in any file and wrap desired component in it to ensure profile is loaded before rendering.

### Example MyComponent.jsx component:
```
import React from 'react';
import userInputs from 'user-inputs';

class MyComponent extends React.Component {
    ...
}

export default userInputs(MyComponent);
```

### Example inline component:
```
import React from 'react';
import userInput from 'with-profile';
import SomeComponent from './components/SomeComponent';

let SomeComponentWithUserInput = userInput(SomeComponent);

export default class MyComp extends React.Component {
    ...

    render() {
        return (
            <div>
                <SomeComponentWithUserInput />
            </div>
        );
    }
}

```


# Known issues
- 



# Wrapping function
The HOC wrapping function attaches the `userInputs` prop to the component being wrapped.

Example: `userInput(YourComponent)` will give access to `this.props.userInputs` inside *YourComponent*.



# Utility functions

`userInput.generateForm(<input_config_array>, <confirm_callback>)` - Returns a `generatedForm` object. See [Generating Forms](#generating-forms).


# Generating forms
A generated form is an object returned from `userInput.generateForm`:
```
{
    component: <JSX Component>,
    getValues: () => the values currently in the form,
    reset: () => void <function to reset inputs to default_values>,
    setInputConfig: (<InputConfig>) => void <function to update an input>
}
```
