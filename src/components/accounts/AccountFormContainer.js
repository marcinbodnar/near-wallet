import React from 'react'
import PropTypes from 'prop-types'
import { Container, Loader, Grid, Dimmer, Header } from 'semantic-ui-react'
import { parse } from 'query-string'

import Disclaimer from '../common/Disclaimer'

import styled from 'styled-components'

const CustomContainer = styled(Container)`
   &&&& {
      .page-title {
         padding-right: 0px;
         padding-top: 48px;
         padding-bottom: 0px;

         .column {
            padding: 0 14px 48px 0;
         }
         h1 {
            line-height: 48px;
         }
         h2 {
            color: #4a4f54 !important;
         }
      }
      
      @media screen and (max-width: 767px) {
         .page-title {
            padding-top: 14px;
            text-align: center;

            .column {
               padding: 0 0 6px 0;
            }
            h1 {
               margin-bottom: 0px;
            }
            h2 {
               font-size: 16px !important;
               line-height: 22px !important;
               color: #999 !important;
               padding-bottom: 24px;
            }
            .column.add {
               text-align: left;
               padding-top: 0px !important;
            }
         }
      }
   }

`

/* eslint-disable jsx-a11y/accessible-emoji */
const AccountFormContainer = ({ loader, location, title, text, children }) => (
   <CustomContainer>
      <Grid stackable>
         <Dimmer inverted active={loader}>
            <Loader />
         </Dimmer>

         <Grid.Row columns='2' className='page-title'>
            <Grid.Column computer={9} tablet={8} mobile={16}>
               <Header as='h1'>{title}</Header>
               <Header as='h2'>{text}</Header>
               {location && parse(location.search).reset_accounts && (
                  <Header as='h3' className='color-blue'>
                     You have been redirected to this page because we had to reset the developer accounts. Please create a new account. We apologize for the inconveience.
                  </Header>
               )}
            </Grid.Column>
         </Grid.Row>
      </Grid>

      {children}

      <Disclaimer />
   </CustomContainer>
)

AccountFormContainer.propTypes = {
   loader: PropTypes.bool.isRequired,
   location: PropTypes.object,
   title: PropTypes.string,
   text: PropTypes.string,
   children: PropTypes.element,
}

export default AccountFormContainer