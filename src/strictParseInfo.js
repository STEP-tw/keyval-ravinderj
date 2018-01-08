const Parsed=require("./parsed.js");
const ParseInfo=require("./parseInfo.js");
const InvalidKeyError=require("./errors/invalidKeyError.js");

const contains=function(list,key,caseSensitiveness) {
  if(caseSensitiveness){
    return list.find(function(validKey){
      return key==validKey;
    });
  }
  return list.find(function(validKey){
    return key.toUpperCase()==validKey.toUpperCase();
  });
}

var StrictParseInfo=function(initialParsingFunction,validKeys,caseSensitiveness) {
  ParseInfo.call(this,initialParsingFunction);
  this.validKeys=validKeys;
  this.caseSensitiveness = caseSensitiveness;
}

StrictParseInfo.prototype=Object.create(ParseInfo.prototype);

StrictParseInfo.prototype.pushKeyValuePair=function() {
  if(!contains(this.validKeys,this.currentKey,this.caseSensitiveness))
  throw new InvalidKeyError("invalid key",this.currentKey,this.currentPos);
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}

module.exports=StrictParseInfo;
