module.exports = {
  apps : [{
    name: 'Node web server',
    script: '.',
    interpreter: 'felt-node-server',
    watch: '.',
    env: {
      ENV: 'development'
    },
    env_production : {
      ENV: 'production'
    }
  }, {
    name: 'Node worker',
    script: '.',
    interpreter: 'felt-node-worker',
    watch: '.',
    env: {
      ENV: 'development'
    },
    env_production : {
      ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/main',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
