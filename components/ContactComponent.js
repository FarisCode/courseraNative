import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import MailCompose from 'react-native-mail-compose';
export default class ContactComponent extends Component {

  async sendMail() {
    try {
      await MailCompose.send({
        toRecipients: ['confusion@food.net'],
        subject: 'Enquiry',
        text: 'To whom it may concern:',
        ccRecipients: [],
        bccRecipients: [],
      });
    } catch (e) {
      console.warn(e);
    }
  }

  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={500} delay={300}>
        <Card title='Contact Information'>
          <Text>121, Clear Water Bay Road</Text>
          <Text>Clear Water Bay, Kowloon</Text>
          <Text>HONG KONG</Text>
          <Text>Tel: +852 1234 5678</Text>
          <Text>Fax: +852 8765 4321</Text>
          <Text>Email:confusion@food.net</Text>
          <Button
            title="Send Email"
            buttonStyle={{ backgroundColor: "#512DA8" }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.sendMail}
          />
        </Card>
      </Animatable.View>
    )
  }
}
