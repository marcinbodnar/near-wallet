import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { Wallet } from '../../utils/wallet'

import {
   handleRefreshAccount,
   handleRefreshUrl,
   checkAccountAvailable,
   clear
} from '../../actions/account'

import SendMoneyContainer from './SendMoneyContainer'
import SendMoneyFirstStep from './SendMoneyFirstStep'
import SendMoneySecondStep from './SendMoneySecondStep'
import SendMoneyThirdStep from './SendMoneyThirdStep'

class SendMoney extends Component {
   state = {
      loader: false,
      step: 1,
      note: '',
      expandNote: false,
      paramAccountId: false,
      accountId: '',
      amount: ''
   }

   componentDidMount() {
      this.wallet = new Wallet()
      this.props.handleRefreshUrl(this.props.location)
      this.props.handleRefreshAccount(this.wallet, this.props.history)

      const paramId = this.props.match.params.id

      this.setState(() => ({
         loader: true
      }))

      if (paramId) {
         this.props.checkAccountAvailable(paramId).then(({ error }) => {
            this.setState(() => ({
               loader: false,
               accountId: paramId
            }))

            if (error) return

            this.setState(() => ({
               paramAccountId: true
            }))
         })
      } else {
         this.setState(() => ({
            loader: false
         }))
      }
   }

   componentWillUnmount = () => {
      this.props.clear()
   }

   handleNextStep = () => {
      this.setState(state => ({
         step: ++state.step
      }))
   }

   handleChange = (e, { name, value }) => {
      this.setState(() => ({
         [name]: value
      }))
   }

   handleExpandNote = () => {
      this.setState(() => ({
         expandNote: true
      }))
   }

   handleChangeAccountId = (e, { name, value }) => {
      this.setState(() => ({
         [name]: value
      }))

      this.timeout && clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
         this.props.checkAccountAvailable(value)
      }, 500)
   }

   render() {
      const { step } = this.state
      const { requestStatus, formLoader } = this.props

      return (
         <SendMoneyContainer step={step}>
            {step === 1 && (
               <SendMoneyFirstStep
                  handleNextStep={this.handleNextStep}
                  handleChange={this.handleChange}
                  handleChangeAccountId={this.handleChangeAccountId}
                  requestStatus={requestStatus}
                  formLoader={formLoader}
                  {...this.state}
               />
            )}
            {step === 2 && (
               <SendMoneySecondStep
                  handleNextStep={this.handleNextStep}
                  handleExpandNote={this.handleExpandNote}
                  {...this.state}
               />
            )}
            {step === 3 && <SendMoneyThirdStep {...this.state} />}
         </SendMoneyContainer>
      )
   }
}

const mapDispatchToProps = {
   handleRefreshAccount,
   handleRefreshUrl,
   checkAccountAvailable,
   clear
}

const mapStateToProps = ({ account }) => ({
   ...account
})

export const SendMoneyWithRouter = connect(
   mapStateToProps,
   mapDispatchToProps
)(withRouter(SendMoney))
