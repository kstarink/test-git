montageDefine("e3e3727","core/converter/bytes-converter",{dependencies:["montage","core/converter/converter","core/converter/number-converter"],factory:function(e,t){e("montage").Montage;var n=e("core/converter/converter").Converter,i=e("core/converter/number-converter")._numericValueToString;e("core/converter/number-converter")._stringToNumericValue;var s=e("core/converter/number-converter").NUMERIC_SCALES_BINARY_,a=e("core/converter/converter").isDef,r=["P","T","G","M","K","","m","u","n"],o=function(e,t,n){var o="";return(!a(n)||n)&&(o="B"),i(e,s,t,o,r)},l=function(e,t){return o(e,t,!1)};t.BytesConverter=n.specialize({decimals:{value:2},convert:{value:function(e){return l(e,this.decimals)}},revert:{value:function(e){return e}}})}});