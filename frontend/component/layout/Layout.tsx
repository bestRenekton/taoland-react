import React, { memo } from 'react';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Header, Footer, ErrorBoundary } from '@/component';
import { createtheme } from '@/util';
import { THEMECONFIG } from '@/constans';
import { IAppReducer } from '@/interface/app';
import { useSelector } from 'react-redux';
import { RootState } from '@/model/rootReducer';



interface ILayout {
    Component, pageProps, router
}
export const Layout: React.SFC<ILayout> = memo(({ Component, pageProps, router }) => {
    // console.log('Layout', app);
    const app: IAppReducer = useSelector((state: RootState) => { return state.app; });
    const { theme } = app;
    const themeProgramme = createtheme(THEMECONFIG[theme]);

    return (
        <ThemeProvider theme={themeProgramme}>
            <div id="WELCOME">
                <p>A KAKAJIOJIO PLACE OF FRONT END.</p>
                <h1>TAO LAND</h1>
            </div>
            <CssBaseline />
            <ErrorBoundary>
                <SnackbarProvider maxSnack={3}>
                    <Header />
                    <Container>
                        <Component {...pageProps} router={router} />
                    </Container>
                    <Footer />
                </SnackbarProvider>
            </ErrorBoundary>
        </ThemeProvider>
    );
});
