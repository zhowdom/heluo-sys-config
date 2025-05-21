// @ts-nocheck
import {UeReportType, UeReportParams} from '@/types'
export function useUeConnect() {

  // "object" != typeof ue || "object" != typeof ue.interface ? ("object" != typeof ue && (ue = {}), ue.interface = {}, ue.interface.broadcast = function(e, t) {
  //     if ("string" == typeof e) {
  //       var o = [e, ""];
  //       void 0 !== t && (o[1] = t);
  //       var n = encodeURIComponent(JSON.stringify(o));
  //       "object" == typeof history && "function" == typeof history.pushState ? (history.pushState({}, "", "#" + n), history.pushState({}, "", "#" + encodeURIComponent("[]"))) : (document.location.hash = n, document.location.hash = encodeURIComponent("[]"))
  //     }
  //   }) : function(e) {
  //     ue.interface = {}, ue.interface.broadcast = function(t, o) {
  //       "string" == typeof t && (void 0 !== o ? e.broadcast(t, JSON.stringify(o)) : e.broadcast(t, ""))
  //     }
  //   }(ue.interface), (window.ue4 = ue.interface.broadcast);
  //   window.ue = ue;
  //   // for debugger
  // window.ue = ue;
  // console.log(window.unescape, 'window.ue')

  const ueConnect = async (type:UeReportType, payload?:any) => {
    try {
      switch(type) {
        case UeReportType.FLOAT_DIRECTION:
          console.log({
            param1: UeReportParams[UeReportType.FLOAT_DIRECTION],
            param2: payload?.opt
          })
          window.ue.web.js_call_ue(UeReportParams[UeReportType.FLOAT_DIRECTION], payload?.opt)
          break;
        case UeReportType.FLOAT_MENU_HOME:
          console.log({
            param1: UeReportParams[UeReportType.FLOAT_MENU_HOME],
            param2: payload?.opt
          })
          window.ue.web.js_call_ue(UeReportParams[UeReportType.FLOAT_MENU_HOME], payload?.opt)
          break;
        case UeReportType.WEATHER:
          console.log({
            param1: UeReportParams[UeReportType.WEATHER]
          })
          window.ue.web.js_call_ue(UeReportParams[UeReportType.WEATHER])
          break;
        case UeReportType.WARN_ITEM:
          console.log({
            param1: UeReportParams[UeReportType.WARN_ITEM],
            param2: payload?.opt
          })
          window.ue.web.js_call_ue(UeReportParams[UeReportType.WARN_ITEM], payload?.opt)
          break;
        case UeReportType.PROFESSION:
          console.log({
            param1: UeReportParams[UeReportType.PROFESSION],
            param2: payload?.opt
          })
          window.ue.web.js_call_ue(UeReportParams[UeReportType.PROFESSION], payload?.opt)
          break;
        case UeReportType.FLOOR:
          console.log({
            param1: UeReportParams[UeReportType.FLOOR],
            param2: payload?.opt
          })
          window.ue.web.js_call_ue(UeReportParams[UeReportType.FLOOR], payload?.opt)
          break;
        default:
          console.log('No matched to event type')
      }
    } catch (e) {
      console.log(e)
    }
  }
  return {
    ueConnect
  }
}
