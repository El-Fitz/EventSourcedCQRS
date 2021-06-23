/*
 * @Author: Thomas Léger 
 * @Date: 2021-06-12 22:43:14 
 * @Last Modified by: Thomas Léger
 * @Last Modified time: 2021-06-12 23:18:44
 */

import * as DateTimeType from "./dateTime.type"
import * as UUIDType from "./uuid.type";
import * as PayloadType from "./payload.type";
import * as VersionType from "./version.type";

namespace Types {
	export import DateTime = DateTimeType.DateTime;
	export import Payload = PayloadType.PayloadType;
	export import UUID = UUIDType.UUID;
	export import Version = VersionType.Version;
}

export default Types;