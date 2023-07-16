// Write your tests here

import React from 'react'
import AppFunctional from './AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('sanity', () => {
  expect(true).toBe(true)
})


test('header renders', () => {
  render(<AppFunctional />)

  const coordinates = screen.queryByText(/coordinates/i)
  const buttonUp = screen.queryByText('UP')
  const leftButton = screen.queryByText('LEFT')
  const buttonRight = screen.queryByText('RIGHT')
  const buttonDown = screen.queryByText('DOWN')
  const buttonReset = screen.queryByText('reset')

  expect(coordinates).toBeInTheDocument()
  expect(leftButton).toBeInTheDocument()
  expect(buttonRight).toBeInTheDocument()
  expect(buttonUp).toBeInTheDocument()
  expect(buttonDown).toBeInTheDocument()
  expect(buttonReset).toBeInTheDocument()
})

test('typing in input results in text entered', () => {
  render(<AppFunctional />)

  const inputBox = screen.getByRole('textbox', {id:'email'})

  expect(inputBox)
    .toBeInTheDocument()
  fireEvent.change(inputBox, { target: {value: 'pizzatime'}})
  expect(inputBox)
    .toHaveValue('pizzatime')
})

test('clicking reset clears input box', () => {
  render(<AppFunctional />)

  const inputBox = screen.getByRole('textbox', {id:'email'})
  const buttonReset = screen.getByTestId('reset')

  fireEvent.change(inputBox, { target: {value: 'pizzatime'}})
  expect(inputBox)
    .toHaveValue('pizzatime')
  fireEvent.click(buttonReset)
  expect(inputBox)
    .toHaveValue('')
})

test('cannot go up past bounds', () => {
  render(<AppFunctional />)
    const buttonUp = screen.getByTestId('up')
      fireEvent.click(buttonUp)
      fireEvent.click(buttonUp)
      expect(screen.getByText("You can't go up")).toBeInTheDocument()
})

test('displays moves', () => {
  render(<AppFunctional />)
    const buttonUp = screen.getByTestId('up')
     fireEvent.click(buttonUp)
      expect(screen.getByText("You moved 1 time")).toBeInTheDocument()
})
