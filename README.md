[TOC]
#GuanyuChen for IFE
##第二阶段
####task21

关于`String.split('分隔符')`的奇技淫巧

当想用多个分隔符分割String时，可以用正则表达式`/[]/`来匹配多个分隔符
比如想匹配逗号 句号 空格 --- `String.split(/[,. ]/);`

