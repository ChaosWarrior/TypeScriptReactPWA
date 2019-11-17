import * as React from 'react';
interface  HelloPros{
    name:String;
    age:number;
}
export class Hello extends React.Component<HelloPros,{}>{
    render(){
        return (
            <div>
                My name is , {this.props.name} , age {this.props.age}
            </div>
        );
    }
}