import { Injectable } from "@angular/core";

export interface Project {
    imageUrl: string;
    imageAlt: string;
    title: string;
    description: string ;
    githubUrl: string;
    stack: string[];
    playStoreUrl: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class ProyectProvider {
    projectList: Project[] = [
        {
            imageUrl: "images/recipebook.png",
            imageAlt: "",
            title: "Recipebook: mi recetario",
            description: "Mi recetario, una app moderna e intuitiva en la que podrás guardar tus recetas favoritas propias. Tambien puedes buscar en línea miles de recetas para poder expandir tu recetario y cocinar platillos increibles de todas las cocinas",
            githubUrl: "https://github.com/hicks17/MyRecipebook",
            playStoreUrl: "https://play.google.com/store/apps/details?id=js.apps.recipesapp",
            stack: [
                "Kotlin",
                "Jetpack Compose",
                "MVVM",
                "Clean architechture",
                "Dagger Hilt (DI)",
                "API Rest with Retrofit",
                "Room Database",
                "AdMob",
                "Google Play Billing"
            ]
        },
         {
             imageUrl: "images/gtv.png",
             imageAlt: "",
             title: "Guess the value",
             description: "Una aplicación para los amantes de fútbol para demostrar sus conocimientos. \Guess the value es un juego que consiste en seleccionar entre dos jugadores, el jugador que tenga un valor de mercado mayor. Se puede jugar entre jugadores de la Liga Premier Inglesa, jugadores de toda Europa, y un modo especial para comparar las mejores campañas goleadoras de los mejores del mundo.",
             githubUrl: "https://github.com/hicks17/GuessTV",
             stack: [
                "Kotlin",
                "XML",
                "MVVM",
                "Clean architechture",
                "Dagger Hilt (DI)",
                "AdMob",
                "Room Database",
                "Coroutines and threads"
             ],
             playStoreUrl: "https://play.google.com/store/apps/details?id=js.apps.guessthevalue&pcampaignid=web_share"
         },
         {
             imageUrl: "images/geoquiz.png",
             imageAlt: "",
             title: "Geo Quiz Mx",
             description: "Geo Quiz Mx, un quiz de geografía principalmente para aprender acerca de México y además preguntas de geografía mundial. Podrás aprender de las capitales de México y los países de todos los continentes. Rango de preguntas para todos los niveles: secundaria, preparatoria y superior. La app incluye 3 modos: Normal. Desafío y Sin Error y 3 niveles de dificultad de acuerdo al rnago de escolaridad del usuario: Fácil, Díficil y Experto. \Incluye un ranking para comparar tus resultados con los demás usuarios, ¡demustra que sabes más que el resto!",
             githubUrl: "https://github.com/hicks17/GeoQuizMX",
             stack: [
                "Kotlin",
                "XML",
                "Realtime Database",
                "MVVM",
                "Clean architechture",
                "Dagger Hilt",
                "AdMob",
                "Room Database",
                "Coroutines and threads",
                "Google Play Billing"
             ],
             playStoreUrl: "https://play.google.com/store/apps/details?id=app.geoquiz.geoquizmx"
         },
         {
             imageUrl: "images/spotify.png",
             imageAlt: "",
             title: "Spotify Search API",
             description: "Una app en la que puedes buscar y abrir en la app de Spotify cientos de miles de canciones, albumes y artistas, potenciada por la API de Spotify",
             githubUrl: "https://github.com/hicks17/SpotifyAPIConsumer",
             stack: [
                "Kotlin",
                "Jetpack Compose",
                "Retfofit",
                "MVVM",
                "Clean architechture",
                "Dagger Hilt (DI)",
                "Coroutines and threads"
             ],
             playStoreUrl: null
         },
         {
             imageUrl: "images/countries.png",
             imageAlt: "",
             title: "GraphQL Countries app",
             description: "App que muestra una lista de todps lo países mediante una api usando GraphQL, y te muestra información como capital, moneda, etc al dar clic.",
             githubUrl: "https://github.com/hicks17/GraphQLCountries",
             stack: [
                "Kotlin",
                "Jetpack Compose",
                "MVVM",
                "Clean architechture",
                "Dagger Hilt (DI)",
                "Coroutines and threads",
                "Graph QL"
             ],
             playStoreUrl: null
         }
    ]
}