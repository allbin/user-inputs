# userInput

A repo for wrapping components with a userInput HOC to enable easy creation of modals which may include specific inputs fields for the user.

userInput can also generate input components for use outside of modals.

### Index
[Quick guide](#quick-guide)  
[HOC Wrapping function](#wrapping-function)  
[Utility functions](#utility-functions)  
[Generating inputs](#generate-inputs)  
[Opening a modal](#opening-a-modal)  



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
- The 



# Wrapping function
The HOC wrapping function attaches the `userPrompt` prop to the component being wrapped.

Example: `userInput(YourComponent)` will give access to `this.props.userPrompt` inside *YourComponent*.

### Optional parameters
#### SpinnerComponent
*userInput(YourComponent, **`SpinnerComponent`**)*.  
Optionally a second component can be supplied which will be shown while the profile is being fetched. The spinner component, if supplied, also gets all props assigned to the wrapped component.



# Utility functions

`userInput.configure(<config object>, <default profile>)` - See [Setting config and default](#setting-config-and-default).

`userInput.doAfterFirstFetch(<callback>)` - The callback will be called with the profile as argument after the first time the profile has been fetched. Can be called multiple times, callbacks will be called in the 


