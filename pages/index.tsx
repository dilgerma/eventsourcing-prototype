"use client"
import Head from 'next/head';
import {useEffect, React} from 'react';
// @ts-ignore
import {DebugEvents} from '@/app/components/debug/eventsdebug';
import SliceViews from '@/app/components/SliceViews';
import {ProcessorSelection, ViewSelection} from '@/app/core/types';
import changepasswordScreen from '@/app/components/slices/changepassword/Screen';

import activateaccountsAutomationProcessor from '@/app/components/slices/activateaccounts/AutomationProcessor';

import activationlinkAutomationProcessor from '@/app/components/slices/activationlink/AutomationProcessor';

import registeruserScreen from '@/app/components/slices/registeruser/Screen';
import {ActivateAccountProcessor} from '@/app/components/slices/activateaccounts/ActivateAccountProcessor';
import {ActivationLinkProcessor} from '@/app/components/slices/activationlink/ActivationLinkProcessor';


export default function Home(props: any) {

    useEffect(() => {
        var handler = setInterval(() => {
            ActivateAccountProcessor.process()
        }, 2000)
        var handler2 = setInterval(() => {
            ActivationLinkProcessor.process()
        }, 2000)
        return ()=>{ clearInterval(handler);clearInterval(handler2)}
    }, []);

    /*
    * JSON View Definitions per Slice.
    * */
    var sliceViews: ViewSelection[] = [
        {
            "slice": "changepassword",
            "viewType": "Screen",
            "viewName": "changepassword/Screen",
            "view": changepasswordScreen
        },
        {
            "slice": "registeruser",
            "viewType": "Screen",
            "viewName": "registeruser/Screen",
            "view": registeruserScreen
        }]
    var processorViews: ProcessorSelection[] = [
        {
            "slice": "activateaccounts",
            "processorType": "AutomationProcessor",
            "processorName": "activateaccounts/AutomationProcessor",
            "view": activateaccountsAutomationProcessor
        },
        {
            "slice": "activationlink",
            "processorType": "AutomationProcessor",
            "processorName": "activationlink/AutomationProcessor",
            "view": activationlinkAutomationProcessor
        }]
    return (

        <div>

            <div className="content container">
                <Head>
                    <title>Prototype</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <main>
                    <DebugEvents/>
                    <SliceViews views={sliceViews} processors={processorViews}/>
                </main>
            </div>
        </div>

    );
}
