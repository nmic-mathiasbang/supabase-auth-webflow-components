import { AuthGate } from './AuthGate';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(AuthGate, {
  name: 'AuthGate',
  description: 'Page wrapper component - protects page content and redirects to /auth-denied if not authenticated. Includes logout button in top right. Drag all page content inside this component.',
  group: 'Authentication',
  
  props: {
    showLoadingMessage: props.Boolean({
      name: 'Show Loading Message',
      defaultValue: true,
    }),
    
    children: props.Slot({
      name: 'Page Content',
      group: 'Content',
      tooltip: 'Drag all your page content (sections, divs, etc.) into this slot. Content will only be visible when user is authenticated.',
    }),
  },
});

