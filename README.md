# 前端逻辑管理解决方案 factory-js (仅支持npm安装)

### you can

    npm i @fines/factory-js / yarn add @fines/factory-js

### 切入思考点       

　　组件化，解决了一组可以复用的功能，我们可使用一般的开源的公共组件，也可以针对我们特殊业务场景，沉淀出符合自己业务的业务组件；        
　　工程化，解决了可控和规范性的功能，我们可使用开源的一些脚手架比如vue-cli、create-react-app等，或者公司内部自己沉淀的内部脚手架解决方案；   
　　但是谁来解决散落在各个模块和工程中的逻辑？怎样去避免硬代码编程，减少逻辑的后期维护和成本等等，也是一个需要考虑的点。

### 观察代码

　　首先可以从一个客观角度去分析[这份代码](https://github.com/GerryIsWarrior/ajax/blob/master/ajax-npm/index.js)，review这份代码，可以看出很多问题，比如：
* 开头的配置参数和类型检查的配置，代码占了很大篇幅，是否可以抽离到配置文件管理里去维护？
* tools工具类是否可以进行重构，一个tools聚合了很多不同类型的辅助方法，后期增长是否会持续臃肿，是否可以通过分类归纳，tools管理更清晰明了
* tools的内部工具，是否可以拆分成只做一件事和多件事共同完成一件事方式？
* 太长的函数，是否有拆分的可能，增强可读性要求？
* 很多方法依赖自身对象的其他方法，整个链路的流转复杂多变，牵一发动全身。
* 代码能力划分不明确，通用和非通用没有明确界定
* 对外暴露能力的代码重复度比较高
* ......      


　　当时最初写这份代码还做过简单的分类，有点逻辑管理的浅显意识。但是我们可以看看我们自己真实用于生产的公司的项目，多人维护，协同开发、业务增长等，到最后已经完全不可控，逻辑动都不敢动，只敢打补丁，越来越臃肿。下面就是我之前针对我们内部项目一小块做的一块分析，这些都真实存在几乎所有人的代码里，是我们存在的痛点。

* 单独时间处理函数，是否可以抽离到公用逻辑中，基于原型链的属性，是否会污染和覆盖原型链属性等
* 业务交互设计功能，是否可以封装到独立函数中？
* 枚举统一抽离管理？
* 请求抽离统一管理？
* 数据的转换赋值处理？
* 复杂文案拼装，抽象到函数中，提高可读性？减轻复杂度？
* 多重逻辑判断是否可简化表达式？分解复杂条件，合并行为一致？
* ....

### 前端对业务做了什么？

　　基于之前对代码的分析，堆积了很多问题，说明这块确实是我们的痛点。那么这些痛点归根究底是我们做了什么导致？前端对业务到底做了哪些方面的东西？

1. 获取业务数据（业务规则下的数据获取）
2. 数据处理（可细分转换，格式化，校验等等）
3. 业务判断（针对业务场景，每个场景下需要做什么）
4. 业务数据提交（业务规则产出的数据的记录）
5. 业务交互功能（在业务规则下，需要怎么做，做怎样的功能）
6. 业务展示（在业务场景下，合理的show出业务的形态）
7. ......（暂时只想到这些领域，如有遗漏欢迎补充）   

　　以上，几乎囊括了前端在业务领域，所需要做的所有事情，也是我们的所有的逻辑。

### 对逻辑的深入思考

　　我们需要这些逻辑的堆砌去完成我们需要的东西，其实观察每一小块业务代码，都是由一条条最简单的逻辑规则，一步步流转到最后我们所需要的结果的，就跟我们做的思维脑图一样，一个流程节点都是一个小逻辑。一个业务的开始，到一个业务的结束，都是由每个最小的逻辑点组成的。

　　so，我们能不能站在一个全局的角度去看整个业务，能不能把每个流程节点打碎成一个最小的原子，所有的业务逻辑，都是从最小的原子一个一个组装起来的，这样，我们就能更专注于最小的逻辑。我们所做的任何业务都是由原子拼起来。这样就可以从基础去hold住任何逻辑，不管复杂和简单。

　　我们也可以参考，在Java或者其他后端语言里，设计最初是最理想。它们都希望，我的世界就和现实世界一样，都是由最小的颗粒去组装我想要的设计的世界。所以一个class代表了一类事情，一个function代表了一件事。无论你们上面怎么玩，我都能支持你们去组装你们要的世界，你们要做的任何复杂的事。所以，逻辑处理其实也是这样的，把任何逻辑打成最小颗粒，通过拼接，组装，去支撑上层的任何业务逻辑。

如此之后，设想如下场景：

   1. 只关心原子逻辑，去丰富原子逻辑
   2. 业务逻辑，在原子提供的逻辑上适应任何业务规则，通过组装去产出任何业务代码
   3. 业务规则变化下，小变化，直接替换一个逻辑节点，替换插槽。大变化，重新组装另一条业务线。
   4. 整个链路数据流转清晰可追踪
   5. ...

### 理想设计架构图

   ![](https://user-gold-cdn.xitu.io/2019/8/23/16cbde53ab073e42?w=650&h=606&f=png&s=38276)

### 简单摸索设计思路

　　原子逻辑：对象的基类，管理所有注入原子

　　组合逻辑：继承原子，组合，输出

　　对外接口：解析配置，调用原子和组合类管理、抛出生产结果        


思路图如下：

   ![](https://img2018.cnblogs.com/blog/801930/201908/801930-20190823162110919-1128020485.png)
   
### 基类设计代码

    // 原子管理类，管理所有原子逻辑
    class Atom {
    
      /*
      * 注入原子逻辑，以属性的方式管理
      *   objArr： 原子逻辑数组
      * */
      setBasics(objArr) {
        objArr.forEach(x => {
          this[x.name] = x.assembly
        })
      }
    
      /*
      * 生产组装类所需要的原子
      *   param
      *     useBasics：组装类，所需要继承的原子
      *       支持type： String - 指定一个、Array - 指定多个、无（undefined）- 所有
      *
      *   return
      *     output：生产出的原子逻辑
      * */
      machiningBasics(useBasics) {
        let output = {}
        if (useBasics) {
          if (Array.isArray(useBasics)) {
            useBasics.forEach(x => {
              Object.assign(output, this[x])
            })
          } else {
            Object.assign(output, this[useBasics])
          }
        } else {
          Object.keys(this).forEach(x => {
            Object.assign(output, this[x])
          })
        }
        return output
      }
    }
    
　　基类，作为最底层的基础模块，管理所有原子，供上层业务逻辑继承和调用，去组装自己的业务逻辑。该类内部抛出2个方法如下：

　　__setBasics__：作为对原子逻辑的注入。可以持续去丰富底层的原子逻辑（后期是否支持动态注入，再考虑）；

　　__machiningBasics__：提供给组装类继承原子的逻辑，输出所需要的底层基础，供上游拼装
    
### 组装类设计代码

    // 因ES6不支持私有属性，所以将私有属性放到外层
    
    /*
    * 生产组装对象，并注入指定作用域
    *   param -
    *
    *   return
    *     Temporary：组装对象
    *
    * */
    function makeObject() {
      function Temporary(assembly) {
        for (let key in assembly) {
          this[key] = assembly[key].bind(this)
        }
      }
    
      return Temporary
    }
    
    /*
    * 组装中是否透传原子方法
    *   param
    *     Temporary：组装对象
    *     config： 组装的配置
    *
    *   return
    *     output：输出最终逻辑
    * */
    function isThrough(Temporary, config) {
      // 根据配置，实例化对象
      let temp = new Temporary(config.assembly)
      let output = {}
      for (let key in temp) {
        // 是否开启配置
        if (config.through  === false) {
          // 是否是自身属性
          if (temp.hasOwnProperty(key)) {
            output[key] = temp[key]
          }
        } else {
          output[key] = temp[key]
        }
      }
      return output
    }
    
    // 组装类，管理组装和输出。
    class Package {
    
      /*
      * 注入组装配置
      *   param
      *     config：组装配置
      *     prototype：组装所依赖的原子属性
      *
      *   return  生产完成的对象
      * */
      setPackage(config, prototype) {
        let temp = makeObject(config)
        temp.prototype = prototype
        return isThrough(temp, config)
      }
    }
    
    export default Package

　　组装类，通过一系列的原子逻辑组装成一条条所需要的业务逻辑。整体步骤为：生产出组装的对象，通过原型继承装配原子，对外暴露组装结果。就跟工厂一样，生产目标，生产原料，生产产物。组装类对内部抛出一个方法：

　　__setPackage__：根据提供的配置文件以及所需继承的原子，组装出一类业务逻辑。

### index入口设计

    import Atom from './atom/index'
    import Package from './package/index'
    
    // 实例化原子和组装类
    const _atom = new Atom()
    const _package = new Package()
    
    // 生产原子缓存
    let _globalCache = {}
    
    /*
    * 对外暴露，注入配置依赖，生产组装
    *   param
    *     param： 配置参数
    * */
    export const injection = function (param) {
      _atom.setBasics(param.atom)
    
      param.package.forEach(x => {
        let prototype = _atom.machiningBasics(x.extends)
        // 缓存组装
        _globalCache[x.name] = _package.setPackage(x, prototype)
      })
    }
    
    /*
    * 对外暴露，获取生产完成的组装对象
    *   param
    *     param：获取的目标
    *       type：String - 指定一个、Array - 指定多个、 无（undefined） - 全部
    *
    *   return
    *     output：生产结束的对象
    * */
    export const getMateriel = function (param) {
      let output = {}
      if (param) {
        if (Array.isArray(param)) {
          return param.forEach(x => {
            output[x] = _globalCache[x]
          })
        } else {
          output = _globalCache[param]
        }
      } else {
        output = _globalCache
      }
      return output
    }

　　对外的入口，主要功能为解析配置，组装配置，输出组装结果供使用3大功能。

　　__injection__：标准对外入口，进行逻辑管理的初始化，该方法将所有的原子逻辑注入到原子类里，再通过组装配置，从原子类获取到每个组装对象所需要继承的原子供组装使用，最后将组装好的逻辑全局存到一个全局的缓存里。

　　__getMateriel__：对外输出生产完成的组装逻辑，暴露出组装结束的结果，可获取所有组装结果，也可单独或者批量获取结果

### 使用格式规定

##### 默认注入配置（injection方法）

    /*
    *  injection方法注入对象的格式
    *   atom：     所有的原子逻辑
    *   package：  组装原子的逻辑
    */
    {
      atom: ['原子逻辑1', '原子逻辑2'],
      package: ['组装逻辑1', '组装逻辑2']
    }


##### 原子逻辑文件格式

    /*
    *   该格式为原子逻辑的标准格式
    *     name：       原子类的名称
    *     assembly：   原子的方法存放的对象
    */
    export default {
      name: '原子的名称',
      assembly: {
        // 原子逻辑所对外提供的方法
        sendRequest() {
          // do something
        }
      }
    }

##### 组装逻辑文件格式

    /*
    *   该格式为组装逻辑的标准格式
    *     name：       组装类的名称
    *     extends：    组装类需要继承的原子
    *     through：    是否透传原子类内部的信息
    *     assembly：   原子的方法存放的对象
    */
    export default {
      name: '组装类名称',
      extends: '继承原子',      // 支持字符串（单原子）、无（默认继承所有原子）、数组（指定多个原子）
      assembly: {
        // 组装逻辑对外产出的方法，可直接this.来调用继承原子的方法
        getAtom1Promise() {
          // do something...
        }
      }
    }

### DEMO展示(可直接 npm run start  直接跑起来测试)

##### 目录格式  

　　--src  
　　　　|-atom　　　　　　// 存放原子逻辑的地方  
　　　　|-package 　　　　//  存放组装逻辑的地方    
　　　　|-index.js　　 　　//  入口文件   


##### 原子逻辑（atom）  

__atom1.js__

    // atom1.js
    export default {
      name: 'atom1',
      assembly: {
        sendRequest() {
          return new Promise((res, rej) => {
            setTimeout(function () {
              res([1, 2, 3])
            }, 3000)
          })
        }
      }
    }

__atom2.js__

    // atom2.js
    export default {
      name: 'atom2',
      assembly: {
        judgeArray(data) {
          return Array.isArray(data)
        }
      }
    }

##### 组装逻辑（package）

__package1.js__

    // package1.js
    export default {
      name: 'package1',
      extends: 'atom1',
      assembly: {
        getAtom1Promise() {
          this.sendRequest()
            .then(x => {
              console.warn('使用成功', x)
            })
        }
      }
    }

__package2.js__

    // package2.js
    export default {
      name: 'package2',
      through: false,
      assembly: {
        packageLogin() {
          this.sendRequest()
            .then(x => {
              console.warn('判断是否是数组：', this.judgeArray(x))
            })
        }
      }
    }

##### 入口（index）

__index.js__

    import {injection, getMateriel} from '@fines/factory-js'
    
    import atom1 from './atom/atom1'
    import atom2 from './atom/atom2'
    import package1 from './package/package1'
    import package2 from './package/package2'
    
    injection({
      atom: [atom1, atom2],
      package: [package1, package2]
    })
    
    console.warn('组装成功：', getMateriel())
    
    // 测试package1方法
    getMateriel('package1').getAtom1Promise()
    
    // 测试package2方法
    getMateriel('package2').packageLogin()

##### 测试结果    

  ![](https://img2018.cnblogs.com/blog/801930/201908/801930-20190822142445614-1964339614.png)

### npm发布

##### 包名
　　__@fines/factory-js__

##### 安装
　　__npm i @fines/factory-js__

##### 注明
　　fines作为一个新的注册的组织，这里将写一些更美好的东西，以后所有能变得更美好的代码都将发布到这个包下面（更重要一些包名已经无法使用，但是组织可以无限制）


### 后记

以前在逻辑管理领域做过相关的摸索和思考，如下：

1. [思考书写更好可控的代码](https://github.com/GerryIsWarrior/design/blob/master/%E6%80%9D%E8%80%83%E4%B9%A6%E5%86%99%E6%9B%B4%E5%A5%BD%E5%8F%AF%E6%8E%A7%E7%9A%84%E4%BB%A3%E7%A0%81.md)
2. [探索复杂前端业务的开发与设计](https://github.com/GerryIsWarrior/design/blob/master/%E6%8E%A2%E7%B4%A2%E5%A4%8D%E6%9D%82%E3%80%81%E8%B6%85%E5%A4%8D%E6%9D%82%E4%B8%9A%E5%8A%A1%E5%BC%80%E5%8F%91%E4%B8%8E%E8%AE%BE%E8%AE%A1.md)   

　　在之前的摸索基础上，更深入的思考，才最终产出这个逻辑的解决方案，仅供大家参考，后面仍将持续完善该方案。   

　　社区有人说，这不是你前端做的事，不是你的活，做这个干啥？听完这句话，总感觉有点别扭。

　　在我看来，我们每个人都是一个架构师，不断地在架构自己的代码。不停的去认知世界的样子，认知自我。我们都不是最完美的，有好也有坏。去发现自身痛点，对痛点进行分析，进行思考，找出最终的根源，然后再去思考如何去解决这个痛点，尝试，摸索，失败，阶段性胜利，再继续。就这样一路走来，坚信终有收获。共勉！

### 支持信息
个人信息：性别男，爱好女。   
职业目标：全栈架构师   
同步更新：[博客园](https://www.cnblogs.com/GerryOfZhong/)、[知乎](https://www.zhihu.com/people/zhong-qiang-51-33/activities)、[知乎专栏](https://zhuanlan.zhihu.com/zhongqiang) 、[掘金](https://juejin.im/user/59ddddce51882554fb3f177a)
