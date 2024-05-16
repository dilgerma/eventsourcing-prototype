"use client"
import Head from 'next/head';
import React from 'react';
// @ts-ignore
import {CommandSelection} from '@/app/components/commandselection/CommandSelection';
import {handleRegisterUserCommand} from './RegisterUserCommand'
import RegisterUserCommandSchema from './RegisterUserCommand.json'

export default function Screen(props: any) {

    return (

        <div className="content container">

            <div className="content container">
                <Head>
                    <title>Screen</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <main>
                    <CommandSelection commands={[{
                    "command":"RegisterUserCommand",
                    "handler": handleRegisterUserCommand ,
                    "schema": RegisterUserCommandSchema
                }]}/>
                </main>
            </div>
        </div>

    );
}
