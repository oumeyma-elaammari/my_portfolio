import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const SocialLinks = () => (
  <>
    <a href="https://github.com/oumeyma-elaammari" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
      <FaGithub />
    </a>
    <a href="https://www.linkedin.com/in/oumeyma-el-aammari-886115244/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
      <FaLinkedin />
    </a>
    <a href="mailto:elaammarioumeima@gmail.com" aria-label="Send email">
      <FaEnvelope />
    </a>
  </>
);

export default SocialLinks;
