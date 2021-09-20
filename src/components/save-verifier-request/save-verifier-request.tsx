import * as React  from 'react';
import { SaveVerifierRequestProps } from './save-verifier-request-props'
import {useSelector} from "react-redux";
import {getVerifier} from "../../common/reducers/verifier-reducer";



export function SaveVerifierRequest (){
    const verifier = useSelector(state => getVerifier(state));

        console.log(verifier)
        return (
            <div>
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </div>
        );


}
