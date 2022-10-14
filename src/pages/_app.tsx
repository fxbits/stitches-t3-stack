// src/pages/_app.tsx
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { theme } from '../styles/stitches.config';
import { ThemeProvider } from 'next-themes';
import { globalStyles } from '../styles';
import Head from 'next/head';
import { NextPage } from 'next';

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps }
}) => {
    const getLayout =
        (Component as NextPage & { getLayout?: (page: JSX.Element) => JSX.Element }).getLayout ??
        ((page) => page);

    globalStyles();
    return (
        <SessionProvider session={session}>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                value={{
                    dark: theme.dark.className,
                    light: theme.light.className
                }}
            >
                <Head>
                    <title>Create T3 App</title>
                    <meta name="description" content="Generated by create-t3-app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
        </SessionProvider>
    );
};

export default trpc.withTRPC(MyApp);
