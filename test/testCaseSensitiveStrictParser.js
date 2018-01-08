const src=function(filePath){return "../src/"+filePath};

const assert=require('chai').assert;
const Parsed=require(src('parsed.js'));
const StrictParser=require(src('index.js')).StrictParser;

describe("strict parser that is case insensitive",function(){
  it("should parse when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    let parsed=kvParser.parse("NAME=jayanth");
    assert.ownInclude(parsed,expected);
  });

  it("should parse when specified keys are in upper case and actual is not",function(){
    let kvParser=new StrictParser(["NAME"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["name"]="jayanth";
    let parsed=kvParser.parse("name=jayanth");
    assert.ownInclude(parsed,expected);
  });

  it("should parse when specified keys are in mixed case and actual is not",function(){
    let kvParser=new StrictParser(["NaMe"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["name"]="jayanth";
    let parsed=kvParser.parse("name=jayanth");
    assert.ownInclude(parsed,expected);
  });

  it("should parse when specified keys are having lower case and numbers and actual is not",function(){
    let kvParser=new StrictParser(["name_123"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME_123"]="jayanth";
    let parsed=kvParser.parse("NAME_123=jayanth");
    assert.ownInclude(parsed,expected);
  });

  it("should parse when specified keys are having upper case and numbers and actual is not",function(){
    let kvParser=new StrictParser(["NAME_123"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["name_123"]="jayanth";
    let parsed=kvParser.parse("name_123=jayanth");
    assert.ownInclude(parsed,expected);
  });

  it("should parse when specified keys are having mixed case and numbers and actual is not",function(){
    let kvParser=new StrictParser(["NaMe_123"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["name_123"]="jayanth";
    let parsed=kvParser.parse("name_123=jayanth");
    assert.ownInclude(parsed,expected);
  })
});

describe("strict parser that is case sensitive",function(){
  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("NAME=jayanth");
    })
  });

  it("should throw error when specified keys are in upper case and actual is not",function(){
    let kvParser=new StrictParser(["NAME"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("name=jayanth");
    })
  });

  it("should throw error when specified keys are in mixed case and actual is not",function(){
    let kvParser=new StrictParser(["nAmE"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("name=jayanth");
    })
  });
});
