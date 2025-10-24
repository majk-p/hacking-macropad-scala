import smithy from "./smithy.tmLanguage.json"
import { defineShikiSetup, ShikiSetupReturn } from '@slidev/types'

export default defineShikiSetup((): ShikiSetupReturn => {
    return {
        themes: {
            // note: min-light didn't color anything in `diff` snippets
            dark: 'light-plus',
            light: 'light-plus',
        },
        langs: [
            "scala",
            "cpp",
            "shell",
            "diff",
            {
                ...smithy,
                name: "smithy"
            }
        ]
    }
})
