import React from 'react';
import './About.css';
import GithubCard from './GithubCard';

export const About = () => {
  return (
    <div className='about-section'>
        <h2>
            Welcome to Graver - Postcard sharing App!
        </h2>
        <p>
            Graver is an app to create and share postcards with your friends, family and loved ones!
        </p>
        <p>
            Login with your Google account, create a postcard by uploading a picture for your postcard and write something beautiful on the back of the postcard. Graver will create a virtual postcard for you with the image and message you provided. This will show up on your dashboard which can be shared with anyone you like.
        </p>
        <p>
            Cool part is, the postcard receiver need not be signed up on Graver to view the postcard on their browser as Graver provides a view-only shareable link! They can choose to register on Graver to create a postcard themselves.
        </p>
        <p>
            Graver is open-source and you checkout the code on Github! If you like the app, keep using it and star the repositories on GitHub!
        </p>
        <p className='signoff'>
            ~ Kartikey
        </p>
        <div className='github-cards'>
            <GithubCard username="Gizmosoft" repoName="graver" />
            <GithubCard username="Gizmosoft" repoName="graver-server" />
        </div>
    </div>
  )
}
