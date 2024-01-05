# -*- coding: utf-8 -*-
"""Untitled14.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/10zgpQkkOQSCnHoO27LkoneCr5C3VWwiU
"""

# !pip install cvxpy
# !pip install riskfolio-lib
# !pip install yfinance
#!pip install mosek

import numpy as np
import pandas as pd
import yfinance as yf
import warnings
import sys
import json

def predict(value):
    warnings.filterwarnings("ignore")
    pd.options.display.float_format = '{:.4%}'.format

    # Date range
    start = '2016-01-01'
    end = '2019-12-30'

    # Tickers of assets
    assets = ['JCI', 'TGT', 'CMCSA', 'CPB', 'MO', 'APA', 'MMC', 'JPM',
            'ZION', 'PSA', 'BAX', 'BMY', 'LUV', 'PCAR', 'TXT', 'TMO',
            'DE', 'MSFT', 'HPQ', 'SEE', 'VZ', 'CNP', 'NI', 'T', 'BA']
    assets.sort()

    # Downloading data
    data = yf.download(assets, start = start, end = end)
    data = data.loc[:,('Adj Close', slice(None))]
    data.columns = assets

    Y = data[assets].pct_change().dropna()

    # display(Y.head())

    import riskfolio as rp

    # Building the portfolio object
    port = rp.Portfolio(returns=Y)

    # Calculating optimal portfolio

    # Select method and estimate input parameters:

    method_mu='hist' # Method to estimate expected returns based on historical data.
    method_cov='hist' # Method to estimate covariance matrix based on historical data.

    port.assets_stats(method_mu=method_mu, method_cov=method_cov, d=0.94)

    # Estimate optimal portfolio:

    model='Classic' # Could be Classic (historical), BL (Black Litterman) or FM (Factor Model)
    rm = 'MV' # Risk measure used, this time will be variance
    obj = 'Sharpe' # Objective function, could be MinRisk, MaxRet, Utility or Sharpe
    hist = True # Use historical scenarios for risk measures that depend on scenarios
    rf = 0 # Risk free rate
    l = 0 # Risk aversion factor, only useful when obj is 'Utility'

    w = port.optimization(model=model, rm=rm, obj=obj, rf=rf, l=l, hist=hist).to_json()

    # display(w.T)

    return w

