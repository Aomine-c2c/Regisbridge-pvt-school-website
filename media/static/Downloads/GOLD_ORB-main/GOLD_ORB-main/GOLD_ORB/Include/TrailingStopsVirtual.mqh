//+------------------------------------------------------------------+
//|                                            TradeStopsVirtual.mqh |
//|                                              Playground Inc 2021 |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#ifndef TRAILING_STOPS_VIRTUAL_MQH
#define TRAILING_STOPS_VIRTUAL_MQH

#property copyright "Playground Inc 2021"
#property link      "https://www.mql5.com"
#property version   "1.00"

#include "errordescription.mqh"
#include "TradeVirtual.mqh"

class CTrailingVirtual {
protected:
    MqlTradeRequest request;
    MqlTradeResult result;

public:
    CTrailingVirtual() {
        ZeroMemory(request);
        ZeroMemory(result);
    }
    
    // Trailing stop functions
    bool TrailingStop(VirtualTradeInfo& trade, int index, int trailPoints, 
                     int minProfit = 0, int step = 10);
    bool TrailingStop(VirtualTradeInfo& trade, int index, double trailPrice, 
                     int minProfit = 0, int step = 10);
};

// Trailing stop (points, hedging orders)
bool CTrailingVirtual::TrailingStop(VirtualTradeInfo &trade, int index, int trailPoints, int minProfit=0, int step=10)
{
   if(trailPoints <= 0)
      return false;

   if(step < 10) 
      step = 10;


   string symbol = trade.position[index].symbol;
   double point = SymbolInfoDouble(symbol, SYMBOL_POINT);
   int digits = (int)SymbolInfoInteger(symbol, SYMBOL_DIGITS);
   double stepPoints = step * point;
   double minProfitPoints = minProfit * point;
   double trailDistance = trailPoints * point;

   double currentStop = trade.position[index].sl;
   double openPrice = trade.position[index].price;
   double bid = SymbolInfoDouble(symbol, SYMBOL_BID);
   double ask = SymbolInfoDouble(symbol, SYMBOL_ASK);
   
   // Normalize values
   currentStop = NormalizeDouble(currentStop, digits);

   if(trade.position[index].type == "long")
   {
      double trailStopPrice = NormalizeDouble(bid - trailDistance, digits);
      double currentProfit = bid - openPrice;

      if(trailStopPrice > currentStop + stepPoints && currentProfit >= minProfitPoints)
      {
         trade.position[index].sl = trailStopPrice;
         return true;
      }
      return false;
   }
   else if(trade.position[index].type == "short")
   {
      double trailStopPrice = NormalizeDouble(ask + trailDistance, digits);
      double currentProfit = openPrice - ask;

      if((currentStop == 0 || trailStopPrice < currentStop - stepPoints) && currentProfit >= minProfitPoints)
      {
         trade.position[index].sl = trailStopPrice;
         return true;
      }
      return false;
   }

   return false;
}


// Trailing stop (price, hedging orders)
bool CTrailingVirtual::TrailingStop(VirtualTradeInfo &trade, int index, double trailPrice, int minProfit=0, int step=10)
{
   if(trailPrice <= 0)
      return false;
      
   if(step < 10)
      step = 10;
      
   string symbol = trade.position[index].symbol;
   double point = SymbolInfoDouble(symbol, SYMBOL_POINT);
   int digits = (int)SymbolInfoInteger(symbol, SYMBOL_DIGITS);
   double stepPoints = step * point;
   double minProfitPoints = minProfit * point;

   double currentStop = trade.position[index].sl;
   double openPrice = trade.position[index].price;
   double bid = SymbolInfoDouble(symbol, SYMBOL_BID);
   double ask = SymbolInfoDouble(symbol, SYMBOL_ASK);
   
   // Normalize values
   currentStop = NormalizeDouble(currentStop, digits);
   trailPrice = NormalizeDouble(trailPrice, digits);

   if(trade.position[index].type == "long")
   {
      double currentProfit = bid - openPrice;
      if(trailPrice > currentStop + stepPoints && currentProfit >= minProfitPoints)
      {
         trade.position[index].sl = trailPrice;
         return true;
      }
      return false;
   }
   else if(trade.position[index].type == "short")
   {
      double currentProfit = openPrice - ask;
      if((currentStop == 0 || trailPrice < currentStop - stepPoints) && currentProfit >= minProfitPoints)
      {
         trade.position[index].sl = trailPrice;
         return true;
      }
      return false;
   }

   return false;
}

#endif // TRAILING_STOPS_VIRTUAL_MQH

//+------------------------------------------------------------------+



//+------------------------------------------------------------------+

//+------------------------------------------------------------------+
