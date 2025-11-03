import { LoginForm } from './LoginForm';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(LoginForm, {
  name: 'LoginForm',
  description: 'Login form with Supabase authentication',
  group: 'Authentication',
  
  props: {
    showSignUp: props.Boolean({
      name: 'Show Sign Up Option',
      defaultValue: true,
    }),
  },
});

