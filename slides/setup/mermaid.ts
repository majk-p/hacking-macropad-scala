import { defineMermaidSetup } from '@slidev/types'

export default defineMermaidSetup(() => {
    return {
        theme: 'neutral',
        themeVariables: {
            primaryColor: '#BB2528',
            primaryTextColor: '#fff',
            primaryBorderColor: '#7C0000',
            lineColor: '#333',
            secondaryColor: '#006100',
            tertiaryColor: '#fff'
        }
    }
})