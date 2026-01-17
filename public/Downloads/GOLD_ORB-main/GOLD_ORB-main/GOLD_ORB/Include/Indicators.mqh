//+------------------------------------------------------------------+
//|                                                   Indicators.mqh |
//|                                              Playground Inc 2021 |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#ifndef _INDICATORS_MQH_
#define _INDICATORS_MQH_

#include "Trade.mqh"  // Include Trade.mqh which already defines MAX_COUNT
#define INDICATORS_MQH

#property copyright "Playground Inc 2021"
#property link      "https://www.mql5.com"
#property version   "1.00"

// Include common definitions from Trade.mqh


//+------------------------------------------------------------------+
//| Base Class                                                       |
//+------------------------------------------------------------------+

// class CIndicator {
protected:
    int handle;
    double main[];
    
public:
    CIndicator() {
        handle = INVALID_HANDLE;
        ArraySetAsSeries(main, true);
    }
    
    virtual ~CIndicator() {
        Release();
    }
    
    double Main(int shift = 0) {
        if(handle == INVALID_HANDLE) return 0.0;
        
        if(CopyBuffer(handle, 0, 0, MAX_COUNT, main) > 0) {
            double value = NormalizeDouble(main[shift], _Digits);
            return value;
        }
        return 0.0;
    }
    
    virtual void Release() {
        if(handle != INVALID_HANDLE) {
            IndicatorRelease(handle);
            handle = INVALID_HANDLE;
        }
    }
    
    virtual int Init() { return handle; }
    bool IsValid() const { return handle != INVALID_HANDLE; }
};


//+------------------------------------------------------------------+
//| Moving Average                                                   |
//+------------------------------------------------------------------+

/*

CiMA MA;

sinput string MA;		// Moving Average
input int MAPeriod = 10;
input ENUM_MA_METHOD MAMethod = 0;
input int MAShift = 0;
input ENUM_APPLIED_PRICE MAPrice = PRICE_CLOSE;

MA.Init(_Symbol,_Period,MAPeriod,MAShift,MAMethod,MAPrice);

MA.Main()

*/

// class CiMA : public CIndicator {
private:
    int period;
    int shift;
    ENUM_MA_METHOD method;
    ENUM_APPLIED_PRICE price;
    
public:
    CiMA() : period(0), shift(0), method(MODE_SMA), price(PRICE_CLOSE) {}
    
    int Init(const string symbol, const ENUM_TIMEFRAMES timeframe, 
             const int maPeriod, const int maShift = 0,
             const ENUM_MA_METHOD maMethod = MODE_SMA,
             const ENUM_APPLIED_PRICE maPrice = PRICE_CLOSE) {
        period = maPeriod;
        shift = maShift;
        method = maMethod;
        price = maPrice;
        
        handle = iMA(symbol, timeframe, period, shift, method, price);
        return handle;
    }
};


//+------------------------------------------------------------------+
//| RSI                                                              |
//+------------------------------------------------------------------+

/*

CiRSI RSI;

sinput string RS;	// RSI
input int RSIPeriod = 8;
input ENUM_APPLIED_PRICE RSIPrice = PRICE_CLOSE;

RSI.Init(_Symbol,_Period,RSIPeriod,RSIPrice);

RSI.Main()

*/




// class CiRSI : public CIndicator
{
	public:
		int Init(string pSymbol, ENUM_TIMEFRAMES pTimeframe, int pRSIPeriod, ENUM_APPLIED_PRICE pRSIPrice);
};

int CiRSI::Init(string pSymbol, ENUM_TIMEFRAMES pTimeframe, int pRSIPeriod, ENUM_APPLIED_PRICE pRSIPrice)
{
	handle = iRSI(pSymbol,pTimeframe,pRSIPeriod,pRSIPrice);
	return(handle);
}


//+------------------------------------------------------------------+
//| Stochastic                                                       |
//+------------------------------------------------------------------+

/*

CiStochastic Stoch;

sinput string STO;	// Stochastic
input int KPeriod = 10;
input int DPeriod = 3;
input int Slowing = 3;
input ENUM_MA_METHOD StochMethod = MODE_SMA;
input ENUM_STO_PRICE StochPrice = STO_LOWHIGH;

Stoch.Init(_Symbol,_Period,KPeriod,DPeriod,Slowing,StochMethod,StochPrice);

Stoch.Main()
Stoch.Signal()

*/




//+------------------------------------------------------------------+
//| Bollinger Bands                                                  |
//+------------------------------------------------------------------+

/*

CiBollinger Bands;

sinput string BB;		// Bollinger Bands
input int BandsPeriod = 20;
input int BandsShift = 0;
input double BandsDeviation = 2;
input ENUM_APPLIED_PRICE BandsPrice = PRICE_CLOSE; 

Bands.Init(_Symbol,_Period,BandsPeriod,BandsShift,BandsDeviation,BandsPrice);

Bands.Upper()
Bands.Lower()

*/




//+------------------------------------------------------------------+
//| Blank Indicator Class Templates                                  |
//+------------------------------------------------------------------+

/* 

Replace _INDNAME_ with the name of the indicator.
Replace _INDFUNC_ with the name of the correct technical indicator function.
Add appropriate input parameters (...) to Init() function.
Rename Buffer1(), Buffer2(), etc. to something user-friendly.
Add or remove buffer arrays and functions as necessary.



// Single Buffer Indicator

class Ci_INDNAME_ : public CIndicator
{
	public:
		int Init(string pSymbol, ENUM_TIMEFRAMES pTimeframe, ... );
}; 


int Ci_INDNAME_::Init(string pSymbol,ENUM_TIMEFRAMES pTimeframe, ... )
{
	handle = _INDFUNC_(pSymbol,pTimeframe, ... );
	return(handle);
}



// Multi-Buffer Indicator

class Ci_INDNAME_ : public CIndicator
{
	private:
		double buffer1[];
		double buffer2[];
		
	public:
		int Init(string pSymbol,ENUM_TIMEFRAMES pTimeframe, ... );
		double Buffer1(int pShift=0);
		double Buffer2(int pShift=0);
		Ci_INDNAME_();
}; 


Ci_INDNAME_::Ci_INDNAME_()
{
	ArraySetAsSeries(buffer1,true);
	ArraySetAsSeries(buffer2,true);
}


int Ci_INDNAME_::Init(string pSymbol,ENUM_TIMEFRAMES pTimeframe,...)
{
	handle = _INDFUNC_(pSymbol,pTimeframe,...);
	return(handle);
}


double Ci_INDNAME_::Buffer1(int pShift=0)
{
	CopyBuffer(handle,1,0,MAX_COUNT,buffer1);
	double value = NormalizeDouble(buffer1[pShift],_Digits);
	return(value); 
} 


double Ci_INDNAME_::Buffer2(int pShift=0)
{
	CopyBuffer(handle,1,0,MAX_COUNT,buffer2);
	double value = NormalizeDouble(buffer2[pShift],_Digits);
	return(value); 
} 


*/