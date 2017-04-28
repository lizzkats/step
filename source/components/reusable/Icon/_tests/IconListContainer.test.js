import React from 'react'
import sinon from 'sinon'
import moxios from 'moxios'
import { mount } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import { mockGlobalState } from 'sym/source/testUtilities'
import IconListContainer from '../IconListContainer'
import globalState from '../../../utilities/globalState'


describe.only( '<IconListContainer />', () => {
  let wrapper

  context( 'without icons in the globalState', () => {
    let mountSpy, errorStub

    beforeEach( () => {
      moxios.install()
      mountSpy = sinon.spy( IconListContainer.prototype, 'componentDidMount' )
      errorStub = sinon.stub( console, 'warn' ).callsFake( () => null )
      wrapper = mount( <IconListContainer /> )
    })

    afterEach( () => {
      moxios.uninstall()
      mountSpy.restore()
      errorStub.restore()
      wrapper.unmount()
    })

    it( 'calls componentDidMount', () => {
      expect( IconListContainer.prototype.componentDidMount.calledOnce ).to.equal( true )
    })

    it( 'componentDidMount catches and responds with an error', done =>
      moxios.wait( () => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 400,
          response: 'fakeError'
        }).then( () => {
          expect( errorStub.calledTwice ).to.equal( true )
          done()
        }).catch( done )
      })
    )

  })
})
