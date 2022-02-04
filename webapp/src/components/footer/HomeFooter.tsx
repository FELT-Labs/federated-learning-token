import React, { FC } from 'react';
import {
  Button,
  Container,
  NavbarBrand,
  NavLink,
  UncontrolledTooltip,
} from 'reactstrap';
import { GitHub, Twitter } from 'react-feather';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Discord } from '../../assets/icons/discord.svg';

const HomeFooter: FC = () => {
  const blogUrl = 'https://bretahajek.com';
  const docsUrl = 'https://docs.feltoken.ai';
  const githubUrl = 'https://github.com/FELToken/federated-learning-token';
  const twitterUrl = 'https://twitter.com/FELToken';
  const discordUrl = 'https://discord.gg/G4ZFfstsV2';
  const licenceUrl = 'https://github.com/FELToken/federated-learning-token/blob/main/LICENSE';

  return (
    <Container style={{ paddingTop: 52, paddingBottom: 8, marginTop: 'auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          <NavbarBrand tag={RouterNavLink} to="/" style={{ color: 'black', cursor: 'pointer' }}>
            <Logo width={50} height={50} fill="#32325d" />
            FELT
          </NavbarBrand>
          <div>
            <NavLink href={blogUrl} target="_blank" style={{ fontSize: 14 }}>
              Blog
            </NavLink>
            <NavLink href={docsUrl} style={{ fontSize: 14 }}>
              Docs
            </NavLink>
          </div>
        </div>

        <div>
          <Button
            className="btn-icon-only rounded-circle ml-1"
            color="twitter"
            href={twitterUrl}
            id="tooltip_footer_twitter"
            target="_blank"
          >
            <span className="btn-inner--icon text-white">
              <Twitter />
            </span>
          </Button>
          <UncontrolledTooltip delay={0} target="tooltip_footer_twitter">
            Follow on Twitter
          </UncontrolledTooltip>
          <Button
            className="btn-icon-only rounded-circle ml-1"
            color="discord"
            href={discordUrl}
            id="tooltip_footer_discord"
            target="_blank"
          >
            <span className="btn-inner--icon text-white">
              <Discord fill="white" />
            </span>
          </Button>
          <UncontrolledTooltip delay={0} target="tooltip_footer_discord">
            Join community Discord
          </UncontrolledTooltip>
          <Button
            className="btn-icon-only rounded-circle ml-1"
            color="github"
            href={githubUrl}
            id="tooltip_footer_github"
            target="_blank"
          >
            <span className="btn-inner--icon text-white">
              <GitHub />
            </span>
          </Button>
          <UncontrolledTooltip delay={0} target="tooltip_footer_github">
            Star on Github
          </UncontrolledTooltip>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <NavLink
          href="https://github.com/FELToken"
          target="_blank"
          style={{ fontSize: 14 }}
        >
          © {new Date().getFullYear()} Breta
        </NavLink>

        <NavLink href={licenceUrl} target="_blank" style={{ fontSize: 14 }}>
          GPL-3.0 License
        </NavLink>
      </div>
    </Container>
  );
};

export default HomeFooter;
