/*
/// <reference path="./client/bower_components/forms-js/dist/forms-js.d.ts" />
*/


import {Component, Template} from 'annotations';
import {bootstrap, Foreach} from 'angular2/angular2';
import {bind} from 'angular2/di';
// import {Form} from 'client/bower_components/forms-js/source/form'

@Component({
    selector: 'forms-js-form',
    componentServices: [],
    bind: {
        'thing': 'thing'
    }
})

@Template({
        url: 'form.html',
        directives: [Foreach]
    })

export class FormsJsForm {
    // formsjs stuff
//    formsjsForm: Form;
    formsjsForm: any;

    // stuff that I was expecting to see in formsjs but can't find
    viewSchema: any;
    mergedSchema: Array<any>;
    
    // stuff I am messing with
    recordjson: any;
    thing: any;
    formFields: Array<any>;

    constructor() {
        console.log(this.thing);    // Looks like binding doesn't work in this version of ng2, which isn't a problem at the moment
                                    // It works in later betas, but I cabn't get TypeScript to work with those....

//        this.formsjsForm = new formsjs.Form();
        this.formsjsForm = {};
        // Let's hard code a simple example for now, since I can't get the binding to work
        this.formsjsForm.formData = {};
        this.formsjsForm.validationSchema = {
            email: {
                key_: 'email',
                required: true,
                /*pattern: {
                  value: /.+@.+\..+/,
                  failureMessage: "%s is not a valid email format"
                }*/
                pattern: /.+@.+\..+/
            } ,
            username: {
                key_: 'username',
                required: true,
                min: 6,
                pattern: /[0-9a-zA-Z]+/
            },
            comment: {
                key_: 'comment'
            }
        };
        this.viewSchema = {
            fields: [
                {key: 'username', inputType: 'text', label: 'Username' },
                {key: 'email', inputType: 'text', label: 'Email' },
                {key: 'comment', inputType: 'textarea', label: 'Comment' }
            ]
        };
        
        this.formFields = this.viewSchema.fields;
        this.recordjson = '';
    }

    setfield(event, field, value) {
        this.formsjsForm.formData[field] = value;
        this.recordjson = JSON.stringify(this.formsjsForm.formData, null, 2)
    }
}

export function main() {
  bootstrap(FormsJsForm);
}
