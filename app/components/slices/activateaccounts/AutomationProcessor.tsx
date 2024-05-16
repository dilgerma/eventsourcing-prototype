"use client"
import Head from 'next/head';
import React from 'react';
import {ActivationLinkProcessor} from '@/app/components/slices/activationlink/ActivationLinkProcessor';
import {ActivateAccountProcessor} from '@/app/components/slices/activateaccounts/ActivateAccountProcessor';
// @ts-ignore

export default function AutomationProcessor(props: any) {

    return (

        <div className="content container">

            <div className="content container">
                <Head>
                    <title>AutomationProcessor</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <main>
                    <a onClick={()=>ActivateAccountProcessor.process()}>Starte Processor</a>
                </main>
            </div>
        </div>

    );
}
