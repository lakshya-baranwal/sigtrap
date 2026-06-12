---
title: "What is the Black-Scholes Model?"
tags: [quant, finance, options, math]
difficulty: hard
---

The Black-Scholes model is a mathematical model for pricing a European-style option. It estimates the fair price of an option based on parameters like stock price, strike price, time to expiration, risk-free interest rate, and volatility.

### Black-Scholes Equation:
$$\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} + r S \frac{\partial V}{\partial S} - rV = 0$$

Where:
- $S$: Stock price
- $V$: Option price
- $t$: Time
- $\sigma$: Volatility of the underlying stock
- $r$: Risk-free interest rate
