"use client"
import Head from 'next/head';
import React from 'react';
// @ts-ignore
import {DebugEvents} from '@/app/components/debug/eventsdebug';
import SliceViews from '@/app/components/SliceViews';
import {ProcessorSelection, ViewSelection} from '@/app/core/types';
import registeruserScreen from '@/app/components/slices/registeruser/Screen';

import activationlinkAutomationProcessor from '@/app/components/slices/activationlink/AutomationProcessor';

import activateaccountsAutomationProcessor from '@/app/components/slices/activateaccounts/AutomationProcessor';

import changepasswordScreen from '@/app/components/slices/changepassword/Screen';

import confirmationAutomationProcessor from '@/app/components/slices/confirmation/AutomationProcessor';

import { getInMemoryEventStore } from '@event-driven-io/emmett';
import {handleActivateAccountCommand} from '@/app/components/slices/activateaccounts/ActivateAccountCommand';



export default function Home(props: any) {

    /*
    * dummy to trigger eventstore
    *
    * */
    handleActivateAccountCommand({})

    /*
    * JSON View Definitions per Slice.
    * */
    var sliceViews:ViewSelection[] = [
                          {
                              "slice":"registeruser",
                              "viewType":"Screen",
                              "viewName" : "registeruser/Screen",
                              "view" : registeruserScreen
                          },
                          {
                              "slice":"changepassword",
                              "viewType":"Screen",
                              "viewName" : "changepassword/Screen",
                              "view" : changepasswordScreen
                          }]
    var processorViews:ProcessorSelection[] = [
                                 {
                                     "slice":"activationlink",
                                     "processorType":"AutomationProcessor",
                                     "processorName" : "activationlink/AutomationProcessor",
                                     "view" : activationlinkAutomationProcessor
                                 },
                                 {
                                     "slice":"activateaccounts",
                                     "processorType":"AutomationProcessor",
                                     "processorName" : "activateaccounts/AutomationProcessor",
                                     "view" : activateaccountsAutomationProcessor
                                 },
                                 {
                                     "slice":"confirmation",
                                     "processorType":"AutomationProcessor",
                                     "processorName" : "confirmation/AutomationProcessor",
                                     "view" : confirmationAutomationProcessor
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
