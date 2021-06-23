/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-11 16:27:02 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-12 23:08:16
 */

export type PayloadType = string | number | boolean | null | { [key: string]: PayloadType } | Array<PayloadType>;