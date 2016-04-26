[TOC]
#GuanyuChen for IFE
##第二阶段
####task21
关于`String.split('分隔符')`的奇技淫巧

当想用多个分隔符分割String时，可以用正则表达式`/[]/`来匹配多个分隔符
比如想匹配逗号 句号 空格 --- `String.split(/[,. ]/);`

####task22
二叉树遍历无论是前序、中序还是后序，都只要在每个小二叉树里搞明白顺序，再逐渐迭代到大的二叉树里即可。  
前序根左右、中序左根右、后序左右根。

####task24
多叉树遍历分为深度优先遍历和广度优先遍历。深度优先遍历可以用递归实现和栈实现；广度优先遍历可以用递归实现和队列实现  
节点点击事件应用了闭包  

####task25
CSS实现三角形

    width: 0;/*方向向下*/
    height: 0;
    border-left: 50px solid transparent;/*左*/
    border-right: 50px solid transparent;/*右*/
    border-top: 100px solid red;/*上*/

原生JS操作外联样式

    window.getComputedStyle('元素','伪类'); //这个方法获取当前元素*所有属性*的最终值  只读，不能设置
    
    //在TE6~8，上面方法不受支持
    element.currentStyle;   //返回元素当前应用的最终CSS值(包括外联样式)
    
    window.getComputedStyle(element,null).getPropertyValue('属性名');   //获取CSS样式申明对象上的属性名 属性名不需要驼峰写法
    
    //IE下
    style.getAttribute('属性名');  //属性名需要驼峰写法

PS:最终树的节点结构应为  
    
    <div class = 'tree'>
        <span class = 'triangle-right'><sapn>
        <p>节点值</p>
    </div>




