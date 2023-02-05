import {extendTheme, type ThemeConfig} from '@chakra-ui/react';
import Table from './components/Table'

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false
}

const main = extendTheme({
    config,
    components: {
        Table
    }
})

export default main