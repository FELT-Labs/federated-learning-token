import React, { FC } from 'react';
import {
  Button,
  Container,
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip,
} from 'reactstrap';
import { GitHub, Twitter } from 'react-feather';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Discord } from '../../assets/icons/discord.svg';

const HomeFooter: FC = () => {
  const blogUrl = 'https://bretahajek.com';
  const githubUrl = 'https://github.com/Breta01/federated-learning-token';
  const twitterUrl = 'https://twitter.com/FELToken';
  const discordUrl = 'https://discord.gg/MgTDCW8GyW';
  const licenceUrl = 'https://github.com/Breta01/federated-learning-token/blob/main/LICENSE';

  return (
    <Container style={{ paddingTop: 52, paddingBottom: 52 }}>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
      >
        <Nav className="nav-footer">
          <NavItem>
            <NavLink href="#">Contact Us</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={blogUrl} target="_blank">
              Blog
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Docs</NavLink>
          </NavItem>
        </Nav>
      </div>

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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Logo width={50} height={50} />
            FELT
          </div>

          <NavLink
            href="https://github.com/Breta01"
            target="_blank"
            style={{ fontSize: 14 }}
          >
            © {new Date().getFullYear()} Breta
          </NavLink>

          <NavLink href={licenceUrl} target="_blank" style={{ fontSize: 14 }}>
            GPL-3.0 License
          </NavLink>
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
    </Container>
  );
};

export default HomeFooter;
