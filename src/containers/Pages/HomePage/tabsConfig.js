import blueMic from "../../../images/blueMic.png";
import yellowMic from "../../../images/yellowMic.png";
import redMic from "../../../images/redMic.png";
import greenMic from "../../../images/greenMic.png";
import portfolioBuilderIcon from "../../../images/portfolioBuilderIcon.png";
import cvBuilderIcon from "../../../images/cvBuilderIcon.png";
import textEditorIcon from "../../../images/textEditorIcon.png";
import articlesDirectoryIcon from "../../../images/articlesDirectoryIcon.png";

const micIconOptions = {
    blue: blueMic,
    yellow: yellowMic,
    red: redMic,
    green: greenMic,
};

const config = {
    tabs: [
        {
            id: 'ntl',
            theme: 'red',
            heroImgSrc: portfolioBuilderIcon,
            cmdImgSrc: micIconOptions['red'],
            title: 'Portfolio Web Page',
            desc: 'Select among some amazing portfolio templates, do some editing with the layout, content, theme, and have your very own portfolio web page online',
            cmd: 'Navigate Portfolio Web Page',
            cmdSlice: 'Portfolio Web Page',
            goTo: '/portfolio-builder',
        },
        {
            id: 'ntr',
            theme: 'green',
            heroImgSrc: cvBuilderIcon,
            cmdImgSrc: micIconOptions['green'],
            title: 'CV Builder',
            desc: 'Build a professional CV with this fully fledged CV Builder, allowing you to add your personal info, education and job history, skills, websites and more',
            cmd: 'Navigate Resume Builder',
            cmdSlice: 'Resume Builder',
            goTo: '/cv-builder',
        },
        {
            id: 'nbl',
            theme: 'blue',
            heroImgSrc: textEditorIcon,
            cmdImgSrc: micIconOptions['blue'],
            title: 'Text Editor',
            desc: 'Write and format articles, blog posts, essays and much more; add images to your document; all this, using this Text Editor',
            cmd: 'Navigate Text Editor',
            cmdSlice: 'Text Editor',
            goTo: '/text-editor',
        },
        {
            id: 'nbr',
            theme: 'yellow',
            heroImgSrc: articlesDirectoryIcon,
            cmdImgSrc: micIconOptions['yellow'],
            title: 'Articles Directory',
            desc: 'Publish your text documents directly onto our site and find all of them right here, in your personal Articles Directory',
            cmd: 'Navigate Articles Directory',
            cmdSlice: 'Articles Directory',
            goTo: '/articles-directory',
        },

    ],
};

export default config;